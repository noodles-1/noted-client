import { Menu } from '@/app/components'
import './styles.css'

export function EmptyNotes() {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <h1> Empty notes page </h1>
        </div>
    )
}
