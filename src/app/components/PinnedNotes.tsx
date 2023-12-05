import { Menu } from '@/app/components'
import './styles.css'

export function PinnedNotes() {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <h1> Pinned notes </h1>
        </div>
    )
}
