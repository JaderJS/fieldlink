import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/_protected/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/_protected/orders/"!</div>
}
