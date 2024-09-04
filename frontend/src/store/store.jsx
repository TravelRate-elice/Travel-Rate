import { create } from "zustand";

const useStore =  create((set) => ({
    country: [],

    storeCountry: (state) => set(()=>({country: state})),

}));

export default useStore;

