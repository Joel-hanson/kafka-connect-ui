"use client"

import AddClusterModal from "@/components/AddClusterModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClusterProvider, useClusters } from "@/contexts/ClusterContext"
import { Database, LoaderPinwheel, PlusCircle, Server } from "lucide-react"
import { useEffect, useState } from 'react'
import ClusterTable from "./cluster/page"


function HomeContent() {
  const { clusters, setShowModal } = useClusters()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Simulate loading delay to ensure localStorage is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])


  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPinwheel className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if ((clusters?.length ?? 0) === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 p-8">
        <Card className="max-w-2xl mx-auto mt-20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6 py-12">
              {/* Animated Icon Group */}
              <div className="relative w-24 h-24">
                <Server className="w-16 h-16 absolute top-0 left-0 text-primary animate-pulse" />
                <Database className="w-16 h-16 absolute bottom-0 right-0 text-primary/80 animate-pulse" />
              </div>

              <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Welcome to Kafka Connect Cluster Manager
              </h1>

              <p className="text-md text-center text-muted-foreground max-w-md">
                Get started by adding your first cluster instance. Manage and monitor your infrastructure effortlessly.
              </p>

              <Button
                onClick={() => setShowModal(true)}
                className="flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Your First Instance</span>
              </Button>

              {/* Feature Highlights */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
                {[
                  { title: 'Easy Setup', desc: 'Quick and simple cluster configuration' },
                  { title: 'Real-time Monitoring', desc: 'Track performance metrics instantly' },
                  { title: 'Secure Management', desc: 'Enterprise-grade security controls' }
                ].map((feature, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-secondary/20">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </CardContent>
        </Card>
        <AddClusterModal />
      </div>
    );
  }

  return (
    <div className="p-8">
      <ClusterTable />
      <AddClusterModal />
    </div>
  );
}


export default function Home() {
  return (
    <ClusterProvider>
      <HomeContent />
    </ClusterProvider>
  )
}