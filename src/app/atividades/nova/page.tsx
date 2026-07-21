import { redirect } from 'next/navigation'

export default function NovaAtividadePage() {
  redirect('/atividades?modal=nova')
}
