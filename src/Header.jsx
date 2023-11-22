import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'

const drawerWidth = 240
const navItems = [{ name: 'Log In', path: '/login' }]

const Header = (props) => {
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState)
	}

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				<ListItemButton sx={{ textAlign: 'center' }} component={NavLink} to="/">
					Form Validation
				</ListItemButton>
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.name} disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }} component={NavLink} to={item.path}>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						<Button sx={{ color: '#fff' }} component={NavLink} to="/">
							Form Validation
						</Button>
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (
							<Button key={item.name} sx={{ color: '#fff' }} component={NavLink} to={item.path}>
								{item.name}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	)
}

export default Header
