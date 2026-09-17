import { init } from '@paralleldrive/cuid2'

const createId = init({
    random: Math.random,
    length: 5,
    fingerprint: 'a-custom-host-fingerprint'
})

const idGenerator = (): string => {
    return createId()
}

export { idGenerator }