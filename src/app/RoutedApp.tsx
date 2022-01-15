import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from 'app/App'
import { HomePage } from 'pages/HomePage'
import { LoginPage } from 'pages/LoginPage'
import { AppProviders } from './providers'

export const RoutedApp = (): JSX.Element => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            {/*<Route path="tasks" element={<Teams />}>*/}
            {/*  <Route path="new" element={<NewTeamForm />} />*/}
            {/*  <Route path=":taskId" element={<Team />} />*/}
            {/*  <Route index element={<LeagueStandings />} />*/}
            {/*</Route>*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}
