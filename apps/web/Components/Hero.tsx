import React from "react";
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Palette, Users, Zap, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

function Hero() {
  return (
    <>
         <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">DrawSync</h1>
          </div>
          <Link href="/login">
            <Button variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Real-time Collaboration</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Create together,
              <span className="text-primary"> draw anywhere</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Join collaborative drawing rooms and create amazing artwork with friends and colleagues in real-time. No
              downloads, just pure creativity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Start Drawing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-border hover:bg-accent/10 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="room-card group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Creative Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Professional drawing tools including brushes, shapes, colors, and layers. Everything you need to bring
                your ideas to life.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="room-card group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Create or join drawing rooms with your team. See everyone's cursors and changes in real-time as you work
                together.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="room-card group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center group-hover:bg-chart-3/30 transition-colors">
                <Zap className="w-6 h-6 text-chart-3" />
              </div>
              <CardTitle className="text-xl">Instant Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Lightning-fast synchronization ensures every stroke appears instantly across all connected devices. No
                lag, just smooth collaboration.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-card/30 rounded-2xl p-12 border border-border/50">
          <h2 className="text-3xl font-bold text-balance">Ready to start creating?</h2>
          <p className="text-muted-foreground text-balance max-w-md mx-auto">
            Join thousands of creators who are already collaborating on DrawSync.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}

export default Hero;
