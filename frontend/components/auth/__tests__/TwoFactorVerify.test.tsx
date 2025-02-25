import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TwoFactorVerify } from "../TwoFactorVerify";

// Increase test timeout
vi.setConfig({ testTimeout: 10000 });

describe("TwoFactorVerify", () => {
  // Mock timers for setTimeout
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the verification form", () => {
    const mockOnVerify = vi.fn();
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter 6-digit code")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should validate code format", async () => {
    const mockOnVerify = vi.fn();
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    const codeInput = screen.getByPlaceholderText("Enter 6-digit code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });

    // Invalid code (too short)
    fireEvent.change(codeInput, { target: { value: "12345" } });
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(screen.getByText("Code must be 6 digits")).toBeInTheDocument();
    });

    // Invalid code (non-numeric)
    fireEvent.change(codeInput, { target: { value: "12a456" } });
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(
        screen.getByText("Code must contain only numbers")
      ).toBeInTheDocument();
    });

    // Valid code
    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.click(verifyButton);
    expect(mockOnVerify).toHaveBeenCalledWith("123456", false);
  });

  it("should show loading state during verification", async () => {
    const mockOnVerify = vi
      .fn()
      .mockImplementation(
        () => new Promise<void>((resolve) => setTimeout(resolve, 1000))
      );
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    const codeInput = screen.getByPlaceholderText("Enter 6-digit code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });

    // Submit valid code
    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.click(verifyButton);

    // Check loading state
    await waitFor(() => {
      expect(screen.getByText("Verifying...")).toBeInTheDocument();
      expect(verifyButton).toBeDisabled();
      expect(codeInput).toBeDisabled();
    });

    // Fast-forward timers
    await vi.runAllTimersAsync();

    // Check loading state is removed
    await waitFor(() => {
      expect(screen.queryByText("Verifying...")).not.toBeInTheDocument();
    });
  });

  it("should allow using backup codes", async () => {
    const mockOnVerify = vi.fn();
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    // Switch to backup code
    fireEvent.click(screen.getByText("Use backup code instead"));

    await waitFor(() => {
      const codeInput = screen.getByPlaceholderText("Enter backup code");
      expect(codeInput).toBeInTheDocument();
    });

    const codeInput = screen.getByPlaceholderText("Enter backup code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });

    // Invalid backup code (too short)
    fireEvent.change(codeInput, { target: { value: "123456789" } });
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(
        screen.getByText("Backup code must be 10 characters")
      ).toBeInTheDocument();
    });

    // Valid backup code
    fireEvent.change(codeInput, { target: { value: "ABCD123456" } });
    fireEvent.click(verifyButton);
    expect(mockOnVerify).toHaveBeenCalledWith("ABCD123456", true);
  });

  it("should handle verification errors", async () => {
    const mockOnVerify = vi.fn(() => Promise.reject(new Error("Invalid code")));
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    const codeInput = screen.getByPlaceholderText("Enter 6-digit code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });

    // Submit code
    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.click(verifyButton);

    // Fast-forward timers
    await vi.runAllTimersAsync();

    // Check error message
    await waitFor(() => {
      expect(screen.getByText("Invalid code")).toBeInTheDocument();
      expect(verifyButton).not.toBeDisabled();
      expect(codeInput).not.toBeDisabled();
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    const mockOnVerify = vi.fn();
    const mockOnCancel = vi.fn();

    render(<TwoFactorVerify onVerify={mockOnVerify} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
