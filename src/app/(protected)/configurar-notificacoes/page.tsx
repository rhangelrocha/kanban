import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ConfigurarNotificacoesFormEmail } from "../_components/configurar-notificacoes/ConfigurarNotificacoesFormEmail"
import { ConfigurarNotificacoesFormWeb } from "../_components/configurar-notificacoes/ConfigurarNotificacoesFormWeb"

export default function ConfigurarNotificacoesPage() {
  return (
    <>
      <div className="pt-5 px-2 lg:px-8 pb-28">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Configurar Notificações</h2>
          </div>
        </div>
        <Tabs defaultValue="email">
          <TabsList>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <ConfigurarNotificacoesFormEmail />
          </TabsContent>
          <TabsContent value="web">
            <ConfigurarNotificacoesFormWeb />
          </TabsContent>
        </Tabs>
        {/* <Separator /> */}
      </div>
    </>
  )
}
