"use client"
import { login } from "./actions";
import { signUp } from "./actions";
import { useActionState } from "react";
import { Button } from "../../../Components/components/ui/button"
import { Input } from "../../../Components/components/ui/input"
import { Label } from "../../../Components/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../Components/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../Components/components/ui/tabs"
import { Palette, Users, Zap } from "lucide-react"
import Link from "next/link";
import { Spinner } from "Components/components/ui/spinner";

function Login() {
   
  const [loginData, loginAction, isLoading]=useActionState(login, undefined)
  const [signUpData, signUpAction, isPending]=useActionState(signUp, undefined)


  return (
    <>



        <div className="auth-container">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and branding */}
        <div className="text-center space-y-4">
          <Link href='/' className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">DrawSync</h1>
          </Link>
          <p className="text-muted-foreground text-balance">Collaborative canvas drawing in real-time</p>
        </div>

        {/* Auth tabs */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form action={loginAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? <> Signing In...<Spinner className="text-white" /> </>: "Login"}
                  </Button>
                  {loginData ? loginData : null}
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form action={signUpAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="username"
                      placeholder="Enter your full name"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" >
                    {isPending ?  <> Creating Account <Spinner className="text-white" /> </>: "Create Account"}
                  </Button>
                  {signUpData? signUpData :null}
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
              <Palette className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Creative Tools</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Collaborate</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Real-time</p>
          </div>
        </div>
      </div>
    </div>
       
    </>
  );
}

export default Login;
