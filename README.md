Aqui está a explicação em formato Markdown:

```markdown
# Configuração de Repositório Git no VPS (Hostinger)

## No VPS
### 1. Crie um Novo Repositório Bare no VPS
No VPS, navegue até o diretório onde o repositório será armazenado:

```bash
cd /var/www/html/
```

Em seguida, inicialize o repositório Bare:

```bash
git init --bare nome-repositorio-bare.git
```

## No PC
### 2. Atualize o URL Remoto no Repositório Local
Crie ou navegue até o repositório no seu PC.

Atualize o URL remoto com o comando abaixo, substituindo o IP pelo IP do seu VPS e o nome do repositório pelo nome desejado:

```bash
git remote add origin ssh://root@IP_do_VPS/var/www/html/nome-repositorio-bare.git
```

### 3. Faça o Push do Branch Principal
Certifique-se de que o repositório local não está vazio. Caso necessário, crie um novo arquivo. 

Execute os seguintes comandos para adicionar, commitar e fazer o push das alterações:

```bash
git status
git add .
git commit -m "texto"
git push origin master  # ou 'main' se o branch principal for 'main'
```

## No VPS
### 4. Acesse o Diretório `/var/www/html/`
No VPS, acesse o diretório onde os repositórios são armazenados:

```bash
cd /var/www/html/
```

### 5. Crie o Diretório do Repositório Web
Crie o diretório onde o repositório web será armazenado:

```bash
mkdir nome-repositorio
```

### 6. Acesse o Novo Diretório Criado
Acesse o novo diretório criado:

```bash
cd nome-repositorio
```

### 7. Inicialize o Repositório Git no Diretório Web
Se for a primeira vez que o repositório está sendo criado, execute o comando abaixo:

```bash
git init  # Somente quando for a primeira vez
```

Verifique o status do repositório:

```bash
git status  # Para atualizar
```

### 8. Adicione e Comite os Arquivos Iniciais
Adicione os arquivos e faça o commit das configurações iniciais:

```bash
git add .
git commit -m "Configuração inicial"
```

### 9. Atualize o Diretório Web com o Repositório Bare
Agora, puxe as alterações do repositório Bare para o diretório web:

```bash
git pull /var/www/html/nome-repositorio-bare.git master  # ou 'main' se o branch principal for 'main'
```

## Observações Importantes
- Certifique-se de que o diretório local no PC não está vazio antes de fazer o push.
- O nome do branch principal pode ser `master` ou `main`, dependendo da configuração do repositório.
- Verifique se todos os comandos foram executados corretamente e se o diretório servido pelo servidor web foi atualizado com as últimas alterações.
```

Esse é um guia detalhado para configurar um repositório Git no VPS Hostinger, incluindo as etapas no servidor e no PC.