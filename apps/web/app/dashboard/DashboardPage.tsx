"use client"
import React from 'react'
import { createRoom } from './actions'
import { useState } from "react"
import { Button } from "../../Components/components/ui/button"
import { Input } from "../../Components/components/ui/input"
import { Label } from "../../Components/components/ui/label"
import { Card, CardContent, CardTitle } from "../../Components/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/components/ui/avatar"
import { Plus, Palette, LogOut, Search, ExternalLink} from "lucide-react"
import Link from "next/link"
import { useActionState } from 'react'
import { logout } from 'app/(auth)/logout/action'
import { getRoomId } from 'Components/JoinRoom/action'
import { Spinner } from 'Components/components/ui/spinner'


interface existingRoomsTypes{
  id:number
  createdAt:Date,
  name:string
}

function AllRooms({existingRooms}:{existingRooms:existingRoomsTypes[]}) {

  console.log(existingRooms);
  
    
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

  const [roomData, createRoomAction, isLoading]=useActionState(createRoom, undefined)
  const [logoutData, logoutAction, isPending]=useActionState(logout,undefined)
  const [joinRoomData, joinRoomAction, joinRoomLoading]=useActionState(getRoomId, undefined)
    
  const filteredRooms = existingRooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
           <div className="min-h-screen bg-background">
    
   {/* <AllRooms/> */}
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
            </div>
           
           
            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {/* <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button> */}
              <form action={logoutAction}>
              <Button type='submit' variant="destructive" size="sm">
                {isPending? <> <Spinner className="text-white" size="small" /> </>:<LogOut className="w-4 h-4"/> }
              </Button>
              {logoutData? logoutData:null}
              </form>
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
                  <Button variant="outline" className="border-border bg-transparent">
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Create New Room</DialogTitle>
                  <DialogDescription>Set up a new collaborative drawing room for your team.</DialogDescription>
                </DialogHeader>
             <form action={createRoomAction}>
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
                      {isLoading ? <> Creating... <Spinner className="text-white" /> </>: "Create Room"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-border">
                      Cancel
                    </Button>  
                  </div>
                  {roomData ? roomData : null}
                </div>
                </form>
              </DialogContent>
            </Dialog>

          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Join Room
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Join Room</DialogTitle>
                  <DialogDescription>
                    Enter the room name to join an existing collaborative drawing session.
                  </DialogDescription>
                </DialogHeader>
                <form action={joinRoomAction}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-room-name">Room Name</Label>
                    <Input
                      id="join-room-name"
                      name="name"
                      placeholder="Enter room name to join"
                      className="bg-input border-border"
                     
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      {joinRoomLoading? <> Joining... <Spinner className="text-white"/> </>: "Join Room"}
                    </Button>
                  </div>
                  {joinRoomData? joinRoomData : null}
                </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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
            <div className="space-y-3">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="room-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-medium text-foreground">{room.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Created {new Date(room.createdAt).toLocaleString()}</p>
                      </div>
                      <Link href={`/${room.name}`}>
                        <Button className="bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Enter Room
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}


      </main>
    </div>
    </>
  );
}

export default AllRooms;
