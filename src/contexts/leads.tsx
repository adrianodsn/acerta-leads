import React, { createContext, useState, useCallback } from 'react'

import api from '../services/api';

const keyLocalStorage = '@Acerta/leads';

export interface ILeadsContextData {
  leads: ILead[];
  tiposEstadoCivil: ITipoEstadoCivil[];
  isLoading: boolean;
  fetchLeads: () => void;
  getById: (id: number) => ILead | null;
  addLead: (lead: ILead) => void;
  updateLead: (id: number, lead: ILead) => void;
  removeLead: (id: number) => void;
}

export const leadsContextDefaultValue: ILeadsContextData = {
  leads: [],
  tiposEstadoCivil: [],
  isLoading: false,
  fetchLeads: () => null,
  getById: () => null,
  addLead: () => null,
  updateLead: () => null,
  removeLead: () => null
}

export const LeadsContext = createContext<ILeadsContextData>(leadsContextDefaultValue);

export const LeadsProvider: React.FC = ({ children }) => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [tiposEstadoCivil, setTiposEstadoCivil] = useState<ITipoEstadoCivil[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const fetchLeads = useCallback(() => {
    setIsLoading(true);
    const localStorageLeads = localStorage.getItem(keyLocalStorage);    
    if (localStorageLeads) {
      setLeads(JSON.parse(localStorageLeads));
    } else {
      api.get('leads')
        .then((res) => {
          setLeads(res.data);
          console.log(res.data);
          setLocalStorage(res.data);
        });
    }

    api.get('tiposEstadoCivil')
      .then((res) => {
        setTiposEstadoCivil(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [setLeads]);

  function setLocalStorage(leads: ILead[]) {
    localStorage.setItem(keyLocalStorage, JSON.stringify(leads));
  }

  const getById = useCallback((id: number) => {
    const updatedLeadIndex = leads.findIndex(lead => lead.id === id);
    return leads[updatedLeadIndex];
  }, [leads]);

  const addLead = useCallback((lead: ILead) => {
    const newLeads = [...leads];
    lead.id = Math.floor(Math.random() * 1000000) + 3;
    newLeads.push(lead);
    setLeads(newLeads);
    setLocalStorage(newLeads);
    setIsLoading(false);
  }, [setLeads, leads]);

  const updateLead = useCallback((id: number, lead: ILead) => {
    const newLeads = [...leads];    
    const updatedLeadIndex = newLeads.findIndex(lead => lead.id === id);
    newLeads[updatedLeadIndex] = lead;
    setLeads(newLeads);
    setLocalStorage(newLeads);
    setIsLoading(false);
  }, [setLeads, leads]);
 
  const removeLead = useCallback((id: number) => {
    const newLeads = [...leads];
    const removedLeadIndex = newLeads.findIndex(lead => lead.id === id);
    if (removedLeadIndex > -1) {
      newLeads.splice(removedLeadIndex, 1);
    }
    setLeads(newLeads);
    setLocalStorage(newLeads);
  }, [setLeads, leads]);
 
  return (
    <LeadsContext.Provider value = {{
      leads,
      tiposEstadoCivil,
      isLoading,
      fetchLeads,
      getById,
      addLead,
      updateLead,
      removeLead
    }} >
      {children}
    </LeadsContext.Provider>
  );
}