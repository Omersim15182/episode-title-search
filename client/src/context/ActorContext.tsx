import { createContext, useState, useContext, ReactNode } from "react";

interface Actor {
  characterName: string;
  actorName: string;
  image: string;
}

interface ActorContextType {
  actorData: Actor[] | any;
  setActorData: (data: Actor[] | any) => void;
}

interface ActorProviderProps {
  children: ReactNode;
}
const ActorContext = createContext<ActorContextType | undefined>(undefined);

export const ActorProvider = ({ children }: ActorProviderProps) => {
  const [actorData, setActorData] = useState<Actor[] | null>(null);

  return (
    <ActorContext.Provider value={{ actorData, setActorData }}>
      {children}
    </ActorContext.Provider>
  );
};

export const useActorContext = (): ActorContextType => {
  const context = useContext(ActorContext);
  if (!context) {
    throw new Error("useActorContext must be used within an ActorProvider");
  }
  return context;
};
