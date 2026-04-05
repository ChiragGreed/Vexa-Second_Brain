import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Collections from './Features/Collections/Pages/Collections/Collections'
import KnowledgeGraph from './Features/KnowledgeGraph/Pages/KnowlegeGraph'
import Resurfacing from './Features/Resurfacing/Pages/Resurfacing'
import Dashboard from './Features/Dashboard/Pages/Dashboard'
import CollectionDets from './Features/Collections/Pages/CollectionDets'
import ItemDets from './Features/Items/Pages/ItemDets'
import SearchResult from './Features/Search/Pages/SearchResult'
import Register from './Features/Authentication/Pages/RegisterPage/Register'
import Login from './Features/Authentication/Pages/LoginPage/Login'
import LandingPage from './Features/Landing Page/Page/LandingPage'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<LandingPage />} />

                <Route path='/register' element={<Register />} />

                <Route path='/login' element={<Login />} />

                <Route path="/app" element={<App />}>

                    {/* default page */}
                    <Route index element={<Dashboard />} />

                    <Route path='inbox' element={<Dashboard />} />

                    <Route path='searchResult' element={<SearchResult />} />

                    <Route path='items/:itemId' element={<ItemDets />} />

                    <Route path="collections" element={<Collections />} />

                    <Route path="collections/:collectionId" element={<CollectionDets />} />

                    <Route path="knowledgeGraph" element={<KnowledgeGraph />} />

                    <Route path="resurfacing" element={<Resurfacing />} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter