"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader2 } from "lucide-react";

interface DocumentSignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName: string;
  onSign: () => Promise<void>;
}

export function DocumentSignDialog({
  open,
  onOpenChange,
  documentName,
  onSign,
}: DocumentSignDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSign = async () => {
    if (!signature || !agreed) return;

    setIsLoading(true);
    try {
      await onSign();
      onOpenChange(false);
    } catch (error) {
      console.error("Error signing document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sign Document
          </DialogTitle>
          <DialogDescription>
            Please review and sign {documentName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Preview */}
          <div className="space-y-2">
            <Label>Document Preview</Label>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                <p className="text-sm">
                  This is a preview of the document content. In a real
                  implementation, this would show the actual document content
                  that needs to be signed.
                </p>
                <p className="text-sm">
                  By signing this document, you acknowledge that you have read
                  and agree to all terms and conditions outlined in this
                  document.
                </p>
              </div>
            </ScrollArea>
          </div>

          {/* Signature Input */}
          <div className="space-y-2">
            <Label htmlFor="signature">Digital Signature</Label>
            <Input
              id="signature"
              placeholder="Type your full name"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Type your full legal name as it appears on your ID
            </p>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreement"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <Label
              htmlFor="agreement"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I acknowledge that my typed name above constitutes my legal
              electronic signature and that I have read and agree to all terms
              and conditions in this document.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSign}
            disabled={!signature || !agreed || isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
