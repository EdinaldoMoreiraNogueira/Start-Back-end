# Recuperação de senha

**RF**

- O usuario deve poder recuperar sua senha informando seu e-mail;
- O usuario deve receber um e-mail com instruções de recuperação de senha;
- O usuario deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambientes dev;
- Utilizar Amazon SES para envio em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar a senha deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar a antiga;



# Atualização do perfil

**RF**

- O usuario deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuario não pode alterar seu e-mail por um e-mail já utilizado;
- Para atualizar sua senha o usuario deve informar a senha antiga;
- Para atualizar sua senha o ususario deve confirmar sua nova senha;




# Painel do Prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento ;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenada em cache;
- As notificações do prestador devem ser armazanadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando o socket.io;




**RN**

- A notificação deve ter um status de lida ou não lida para controle do prestador;



# Agendamentos de Serviços

**RF**

- O usuario deve poder listar todos os prestadores de serviços cadastrados;
- O usuario deve poder listar os dias de um mês co pelo menos um horário disponivel por um prestador;
- O usuario deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;


**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponiveis entre 08:00 às 18:00 horas(O   primeiro agendamento as 08:00 e o ultimo às 17:00 hs);
- O usuario não pode agendar em horário já ocupado;
- O usuario não pode agendar em um horario que já passou;
- O usuario não pode agendar serviços consigo mesmo;




