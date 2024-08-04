import { create } from 'zustand';
import { initialRegions } from '@/lib/data/regionPaths';
import { Region } from '@/lib/types/regions';

interface RegionState {
  regions: Region[];
  toggleRegion: (regionName: string) => void;
  isExcluded: (regionName: string) => boolean;
  toggleAllRegions: (exclude: boolean) => void;
  resetRegions: () => void;
}

export const useRegionStore = create<RegionState>((set, get) => ({
  regions: initialRegions,
  toggleRegion: (regionName: string) =>
    set((state) => ({
      regions: state.regions.map((region) =>
        region.name === regionName
          ? { ...region, excluded: !region.excluded }
          : region
      ),
    })),
  isExcluded: (regionName: string) =>
    get().regions.find((region) => region.name === regionName)?.excluded || false,
  toggleAllRegions: (exclude: boolean) =>
    set((state) => ({
      regions: state.regions.map((region) => ({ ...region, excluded: exclude })),
    })),
  resetRegions: () => set({ regions: initialRegions }),
}));