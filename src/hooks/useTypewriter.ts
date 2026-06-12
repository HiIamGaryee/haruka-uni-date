import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 24, startDelay = 400) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      setLength(0)
      let i = 0
      interval = setInterval(() => {
        i += 1
        setLength(i)
        if (i >= text.length) {
          clearInterval(interval)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  const displayed = text.slice(0, length)
  const done = length >= text.length && text.length > 0

  return { displayed, done }
}
