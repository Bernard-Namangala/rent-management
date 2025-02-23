import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TwoFactorSetup } from "../TwoFactorSetup";

// Increase test timeout
vi.setConfig({ testTimeout: 10000 });

describe("TwoFactorSetup", () => {
  // Mock timers for setTimeout
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the initial step", () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    expect(
      screen.getByText("Set up Two-Factor Authentication")
    ).toBeInTheDocument();
    expect(screen.getByText("1. Scan QR Code")).toBeInTheDocument();
    expect(screen.getByText("Next: Verify Code")).toBeInTheDocument();
  });

  it("should display QR code when loaded", () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    const qrCode = screen.getByTestId("qr-code");
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute("alt", "2FA QR Code");
  });

  it("should proceed to verification step", () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    // Move to step 2
    fireEvent.click(screen.getByText("Next: Verify Code"));

    // Check step 2 content
    expect(screen.getByText("2. Enter Verification Code")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter 6-digit code")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
  });

  it("should validate verification code", async () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    // Move to step 2
    fireEvent.click(screen.getByText("Next: Verify Code"));

    const codeInput = screen.getByPlaceholderText("Enter 6-digit code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });

    // Invalid code
    fireEvent.change(codeInput, { target: { value: "12345" } });
    fireEvent.click(verifyButton);
    expect(screen.getByText("Code must be 6 digits")).toBeInTheDocument();

    // Valid code
    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.click(verifyButton);

    // Wait for loading state
    expect(screen.getByText("Verifying...")).toBeInTheDocument();

    // Fast-forward timers
    await vi.runAllTimersAsync();

    // Wait for step 3
    expect(screen.getByText("3. Save Backup Codes")).toBeInTheDocument();
  });

  it("should show backup codes after verification", async () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    // Move to step 2
    fireEvent.click(screen.getByText("Next: Verify Code"));

    // Enter valid code
    const codeInput = screen.getByPlaceholderText("Enter 6-digit code");
    const verifyButton = screen.getByRole("button", { name: /verify/i });
    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.click(verifyButton);

    // Fast-forward timers
    await vi.runAllTimersAsync();

    // Check backup codes
    const backupCodes = screen.getAllByTestId("backup-code");
    expect(backupCodes).toHaveLength(10);
    backupCodes.forEach((code) => {
      expect(code.textContent).toMatch(/^[A-Z0-9]{10}$/);
    });

    // Check download button
    expect(
      screen.getByRole("button", { name: /download backup codes/i })
    ).toBeInTheDocument();
  });

  it("should show device remember option", () => {
    render(<TwoFactorSetup onComplete={() => {}} />);

    // Move to step 2
    fireEvent.click(screen.getByText("Next: Verify Code"));

    const rememberLabel = screen.getByText("Remember this device");
    expect(rememberLabel).toBeInTheDocument();

    const rememberCheckbox = screen.getByRole("checkbox");
    expect(rememberCheckbox).toBeInTheDocument();
    expect(rememberCheckbox).not.toBeChecked();
  });
});
