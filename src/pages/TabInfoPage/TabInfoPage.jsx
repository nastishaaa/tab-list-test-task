import c from './TabInfoPage.module.css'

export default function TabInfoPage({ tabInfo }) {
    return (
        <>
            <div className={c.container}>
            <h1>Welcome to {tabInfo } page</h1>
            </div>
            
        </>
    )
}