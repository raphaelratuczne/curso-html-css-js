# Boilerplate Webpack

Este projeto foi criado para servir como modelo configurado para projetos simples que utilizem varias paginas html, typescript e scss.

### Plugins para VSCODE

É importante ter os seguintes plugins instalados para utilizar os recursos configurados:

[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Passos para limpar e configurar o projeto

- Faça um backup do seu código e copie esse projeto para a raiz do seu projeto.
- No arquivo package.json, altere a propriedades name para o nome do seu projeto.
- Se não for utilizar, exclua o lodash da lista de dependências.
- No terminal de comando rode o comando para instalar as dependências do projeto:
    
    npm install
    
- O diretório "src" contem outros diretórios para organizar os arquivos do projeto. Você pode excluir todos os arquivos, mas mantenha os diretórios.
- Organizando seus arquivos:
  -- Mova os seus arquivos html para o diretório "src/pages".
  -- Mova seus scripts ts para o diretório "src/scripts".
  -- Mova seus arquivos scss para o diretório "src/assets/scss".
  -- Mova suas imagens para o diretório "src/assets/images".
  -- Caso tenha, mova suas fontes para o diretório "src/assets/fonts".
- Configurando seus arquivos.
  -- Verifique se suas fontes estão corretamente importadas dentro dos arquivos scss obedecendo a nova estrutura de diretórios:

      @font-face {
          font-family: 'Roboto';
      	  src: url('../fonts/Roboto/Roboto-Medium.ttf');
      }

-- Agora seus arquivos scss devem ser importados dentro dos seus arquivos ts:

    import '../assets/scss/index.scss';

-- Você não precisa importar seus scripts nos arquivos html, o webpack fará isso.

- No arquivo "webpack.common.js" é necessário fazer as seguintes alterações de acordo com o seu projeto:
  -- No bloco "entry" você deve referenciar todos os scripts que serão adicionados ás páginas. Não é necessário referencias arquivos que contem apenas exports que não serão diretamente adicionados a uma página.

      entry: {
          index: "./src/scripts/index.ts",
      	  other: "./src/scripts/other.ts",
      }

-- No bloco "plugins", cada pagina html deve ser referenciada dentro de um objeto "HtmlWebpackPlugin":

    new HtmlWebpackPlugin({
        filename: "index.html", // nome do arquivo que será gerado
    	  template: "src/pages/index.html", // seu arquivo html
    	  chunks: ["index"], // os nomes dos arquivos js que serão adicionados no html
    })

- Com tudo configurado, você pode utilizar o script "start" para trabalhar em seu projeto e, ao final pode utilizar o script "build" para gerar os arquivos do seu projeto dentro da pasta "dist".
