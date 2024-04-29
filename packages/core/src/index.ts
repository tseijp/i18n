import { getSnapshotLng, setSnapshotLng } from './utils'
import type { I18N, I18NConfig } from './types'

export const createI18N = <
        Lng extends string = string,
        Ids extends string = string
>(
        config?: I18NConfig<Lng, Ids> & Partial<I18N<Lng, Ids>>
) => {
        const map = new Map<Lng, Map<Ids, string>>()
        const t = (id: Ids) => map.get(self.lng)?.get(id)!
        const change = (lng: Lng) => setSnapshotLng(lng)
        const init = ({ resources, ...other }: I18NConfig<Lng, Ids>) => {
                Object.assign(self, other)
                if (!resources) return
                for (let lng in resources) {
                        if (!map.has(lng)) map.set(lng, new Map())
                        const translation = resources[lng]?.translation
                        const languageMap = map.get(lng)
                        for (const id in translation)
                                languageMap?.set(id, translation[id])
                }
        }

        const self = {
                t,
                init,
                change,
                get lng() {
                        return getSnapshotLng() as Lng
                },
                set lng(lng: Lng) {
                        setSnapshotLng(lng)
                },
        } as I18N<Lng, Ids>

        if (config) init(config)
        return self
}

export const i18n = createI18N()

export default i18n
