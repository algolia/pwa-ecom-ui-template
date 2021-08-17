export type AppState = {
  refinements: {
    expanded: boolean
  }
  dev: { grids: { hidden: boolean } }
}

export const initialAppState: AppState = {
  refinements: {
    expanded: true,
  },
  dev: {
    grids: {
      hidden: true,
    },
  },
}
