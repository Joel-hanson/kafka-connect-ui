"use client"

import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from 'react-use'

interface Cluster {
    name: string
    url: string
}

interface ClusterContextType {
    clusters: Cluster[]
    setClusters: (clusters: Cluster[]) => void
    showModal: boolean
    setShowModal: (show: boolean) => void
}

const ClusterContext = createContext<ClusterContextType | undefined>(undefined)

export function ClusterProvider({ children }: { children: React.ReactNode }) {
    const [clusters, setClusters] = useLocalStorage<Cluster[]>('clusters', [])
    const [showModal, setShowModal] = useState(false)

    return (
        <ClusterContext.Provider value={{
            clusters: clusters || [],
            setClusters,
            showModal,
            setShowModal
        }}>
            {children}
        </ClusterContext.Provider>
    )
}

export function useClusters() {
    const context = useContext(ClusterContext)
    if (context === undefined) {
        throw new Error('useClusters must be used within a ClusterProvider')
    }
    return context
}