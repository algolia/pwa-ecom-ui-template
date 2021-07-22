export interface AppState {
  dev: Dev
}

export const initialAppState: AppState = {
  dev: {
    grid: {
      hidden: true,
    },
  },
}

export interface Dev {
  grid: { hidden: boolean }
}
