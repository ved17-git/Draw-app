"use client"
import React from 'react'
import { createRoom } from './actions'
import { useState } from "react"
import { Button } from "../../Components/components/ui/button"
import { Input } from "../../Components/components/ui/input"
import { Label } from "../../Components/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/components/ui/dialog"
import { Badge } from "../../Components/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/components/ui/avatar"
import { Plus, Users, Clock, Palette, Settings, LogOut, Search, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useActionState } from 'react'




interface Room {
  id: string
  name: string
  description: string
  participants: number
  maxParticipants: number
  isActive: boolean
  lastActivity: string
  thumbnail: string
}
function Dashboard() {

  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

   const [roomData, roomAction, isLoading]=useActionState(createRoom, undefined)

  // Mock data for rooms
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Design Brainstorm",
      description: "UI/UX wireframes and mockups",
      participants: 3,
      maxParticipants: 8,
      isActive: true,
      lastActivity: "2 minutes ago",
      thumbnail: "/design-wireframes.jpg",
    },
    {
      id: "2",
      name: "Art Collaboration",
      description: "Digital painting session",
      participants: 1,
      maxParticipants: 5,
      isActive: false,
      lastActivity: "1 hour ago",
      thumbnail: "/digital-art-painting.png",
    },
    {
      id: "3",
      name: "Architecture Plans",
      description: "Building layout sketches",
      participants: 2,
      maxParticipants: 6,
      isActive: true,
      lastActivity: "15 minutes ago",
      thumbnail: "/architecture-blueprints.jpg",
    },
  ])

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )




  return (
     <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">DrawSync</h1>
              </Link>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                Dashboard
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Welcome back!</h2>
            <p className="text-muted-foreground">Create a new room or join an existing one to start collaborating.</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
               
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Create New Room</DialogTitle>
                  <DialogDescription>Set up a new collaborative drawing room for your team.</DialogDescription>
                </DialogHeader>
             <form action={roomAction}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="room-name">Room Name</Label>
                    <Input
                      id="room-name"
                      type='name'
                      name="name"
                      required
                      placeholder="Enter room name"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type='submit' className="flex-1 bg-primary hover:bg-primary/90">
                      {isLoading ? "Creating...": "Create Room"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-border">
                      Cancel
                    </Button>
                  </div>
                </div>
                </form>
              </DialogContent>
              
            </Dialog>

            <Button variant="outline" className="border-border bg-transparent">
              Join Room
            </Button>
          </div>
        </div>

        {/* Rooms Grid */}
        {/* <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Your Rooms</h3>
            <p className="text-sm text-muted-foreground">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredRooms.length === 0 ? (
            <Card className="room-card text-center py-12">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Palette className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">No rooms found</h4>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try adjusting your search terms." : "Create your first room to get started."}
                  </p>
                </div>
                {!searchQuery && (
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Room
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="room-card group cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">

                  </div>
                  <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg line-clamp-1">{room.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {room.description || "No description"}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={room.isActive ? "default" : "secondary"}
                        className={room.isActive ? "bg-accent text-accent-foreground" : ""}
                      >
                        {room.isActive ? "Active" : "Idle"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {room.participants}/{room.maxParticipants}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{room.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/room/${room.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Enter Room
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-border bg-transparent"
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/room/${room.id}`)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div> */}
      </main>
    </div>
  )
}

export default Dashboard