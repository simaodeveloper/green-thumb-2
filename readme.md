# GreenThumb

## Como rodar este projeto

##### Rodando o modo de desenvolvimento


```
  yarn run watch:dev
```

##### Gerando o pacote para deploy

```
  yarn run build:dist
```

## Link da Aplicação

https://greenthumb-prod.surge.sh

## Observações

- No primeiro momento foquei em criar uma arquitetura onde tudo funciona como um palco (Stage) onde executamos Passos (Steps), a cada avanço o Stage é responsável por navegar entre os Steps;

- Havia pensado em criar animações de transição não não consegui realizar a tempo;

- Utilizei SASS com ITCSS para organizar os estilos, e fica até mais fácil de aplicar crítical CSS para aumentar a performance no first-load;

- Configurei o Webpack para modularizar a aplicação, utilizando ES Modules.

- Tentei modularizar o HTML mas tive problemas com o plugin do Handlebars;

- Tive imprevistos durante o desenvolvimento do teste, então foquei em terminar a aplicação, mas eu queria ter configurado Linters, realizados Testes Unitários com JEST e de Integração com CYPRESS;

- Gostaria de ter adicionado mais acessibilidade como nas imagens (alt) e tooltips (titles) em certos elementos, e mais um plus de WAI-ARIA, como a aplicação tem um controle muito grande por parte do javascript ajudaria muito;

- Gostaria de ter melhorado a aplicação para SEO utilizando JSON-LD, adicionando o schema de Website e das plantas o schema de Produtos, sitemap e robots.txt (eu hospedei o site no dominio da surge, eles bloqueiam os sites de crawlers por padrão, por se tratar de um plano grátis);

- Não tenho experiência com PWA, a ideia era implementar neste teste, vou fazer isso mais para frente;

- Gostaria de ter adicionado um plugin de Autoprefixer via PostCSS para ajudar na compatibilidade dos browsers;

- Em relação ao Cross-Browser, eu foquei no Chrome, mas após terminado o principal a idéia era testar nos demais browsers que eu defini como escopo e ir ajustando conforme encontra-se certos bugs;

- Eu Escrevi todo o Javascript da Aplicação, todas as Bibliotecas são de minha autoria;

- Não sei por que o POST final estava dando Erro 422, sendo que repeti a requisição via POSTMAN e executou corretamente retornando status 200 com um objeto vazio no corpo: {}

- Gostaria de ter adicionado lazy-load nas imagens/conteúdo dinâmico e um loader

- Minha idéia era configurar o Travis para fazer Continous Integration e Continuous Deploy, onde eu ajustaria a aplicação para requisitar os assets de outro domínio como a Netlify e a utilizaria como uma CDN.

- Creio que com a minha separação de Controllers eu poderia utilizar lazy-load com dinamic-imports e aumentar a performance do carregamento no first-load;

- Gostaria de ter melhorado o layout para tablet;

- Eu trabalho bem com GitFlow, mas como era um teste eu desenvolvi tudo na master;
