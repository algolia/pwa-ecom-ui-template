export type AppState = {
  refinements: {
    expanded: boolean
  }
  dev: { grid: { hidden: boolean } }
}

export const initialAppState: AppState = {
  refinements: {
    expanded: true,
  },
  dev: {
    grid: {
      hidden: true,
    },
  },
}
