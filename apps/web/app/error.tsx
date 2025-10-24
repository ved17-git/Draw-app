"use client"

import { Button } from "../Components/components/ui/button"
import { AlertCircle, Server, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    setTimeout(() => {
      setIsRetrying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center border border-destructive/30">
              <Server className="w-10 h-10 text-destructive" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Service Unavailable</h1>
            <p className="text-lg text-muted-foreground">Backend is Down</p>
          </div>

          <div className="bg-card/50 border border-border/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">What happened?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Our drawing server is currently offline. Our team has been notified and is working to restore service.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Error Code:</span> EC2_INSTANCE_DOWN
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-semibold text-foreground">Status:</span> Investigating
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>

          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full border-border hover:bg-accent/10 bg-transparent flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Status Info */}
        <div className="text-center space-y-2 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Need help? Check our{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              status page
            </a>
          </p>
          <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}
