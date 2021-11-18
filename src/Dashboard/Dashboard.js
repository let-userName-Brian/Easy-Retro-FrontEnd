import React from 'react'
import {Divider, Grid} from '@mui/material'
import Navbar from './Navbar'

export default function Dashboard({users}) {
  return (
    <div>
      <nav>
        <Navbar users={users} />
        <Divider color="gray" />
      </nav>
      <Grid item xs={12}>
        <h1>Hey I'm the dashboard</h1>
      </Grid>
    </div>
  )
}
