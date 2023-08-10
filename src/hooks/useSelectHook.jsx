import { useState } from 'react'

function useSelectHook(initialValue) {
    const [value, setValue] = useState(initialValue)

    const data = {
        value,
        onChange: e => {
            setValue(e.target.value)
        }
    }

    return [value, data]
}

export default useSelectHook