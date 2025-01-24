document.addEventListener("DOMContentLoaded", function() {
    // Chamados (Simulando dados)
    const chamados = [
        { id: "20240515100001", dataAbertura: "2024-05-15 10:00", solicitante: "João Silva", status: "Aberto", resumo: "Computador sem internet" },
        { id: "20240515110002", dataAbertura: "2024-05-15 11:00", solicitante: "Maria Souza", status: "Em Andamento", resumo: "Impressora não funciona" }
    ];
     const chamadosTableBody = document.getElementById("chamados-table");
     chamados.forEach(chamado => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${chamado.id}</td>
          <td>${chamado.dataAbertura}</td>
          <td>${chamado.solicitante}</td>
          <td>${chamado.status}</td>
          <td>${chamado.resumo}</td>
        `;
        chamadosTableBody.appendChild(row);
      });
    // Atividades (Simulando dados)
    const atividades = [
        { id: 1, tipo: "Presencial", status: "Em Andamento", dataInicio: "2024-05-15 10:30", dataFim: null },
        { id: 2, tipo: "Remota", status: "Concluída", dataInicio: "2024-05-15 11:30", dataFim: "2024-05-15 12:00" }
    ];
      const atividadesTableBody = document.getElementById("atividades-table");
      atividades.forEach(atividade => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${atividade.id}</td>
            <td>${atividade.tipo}</td>
            <td>${atividade.status}</td>
            <td>${atividade.dataInicio}</td>
            <td>${atividade.dataFim ? atividade.dataFim : '-'}</td>
        `;
          atividadesTableBody.appendChild(row);
      });
    // Usuarios (Simulando dados)
     const usuarios = [
        { id: 1, nome: "João Silva", email: "joao@email.com", telefone:"(11)9999-9999"},
        { id: 2, nome: "Maria Souza", email: "maria@email.com", telefone:"(11)8888-8888"}
    ];
      const usuariosTableBody = document.getElementById("usuarios-table");
      usuarios.forEach(usuario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
        `;
          usuariosTableBody.appendChild(row);
      });

    // Filas (Simulando dados)
    const filas = [
          { id: 1, nome: "Redes", tipo:"Sistema" },
          { id: 2, nome: "Suporte", tipo:"Triagem" }
      ];
        const filasTableBody = document.getElementById("filas-table");
        filas.forEach(fila => {
            const row = document.createElement("tr");
           row.innerHTML = `
               <td>${fila.id}</td>
               <td>${fila.nome}</td>
               <td>${fila.tipo}</td>
           `;
           filasTableBody.appendChild(row);
        });
    // Serviços (Simulando dados)
      const servicos = [
          { id: 1, nome: "Instalação de Software", status: "Ativo", quantidade: 1, preco:"100.00"},
           { id: 2, nome: "Formatação", status: "Ativo", quantidade: 1, preco:"150.00"}
      ];
          const servicosTableBody = document.getElementById("servicos-table");
          servicos.forEach(servico => {
              const row = document.createElement("tr");
               row.innerHTML = `
                   <td>${servico.id}</td>
                   <td>${servico.nome}</td>
                   <td>${servico.status}</td>
                   <td>${servico.quantidade}</td>
                   <td>${servico.preco}</td>
               `;
              servicosTableBody.appendChild(row);
           });

      // Equipamentos (Simulando dados)
        const equipamentos = [
            { id: 1, numeroSerie: "123456", numeroPatrimonio: "PAT-001", descricao: "Notebook Dell"},
            { id: 2, numeroSerie: "789012", numeroPatrimonio: "PAT-002", descricao: "Monitor Samsung"}
        ]
        const equipamentosTableBody = document.getElementById("equipamentos-table");
        equipamentos.forEach(equipamento => {
               const row = document.createElement("tr");
            row.innerHTML = `
                <td>${equipamento.id}</td>
                <td>${equipamento.numeroSerie}</td>
                <td>${equipamento.numeroPatrimonio}</td>
                <td>${equipamento.descricao}</td>
            `;
             equipamentosTableBody.appendChild(row);
         });

    // Inserviveis (Simulando dados)
      const inserviveis = [
           { id: 1, equipamentoId: 1, dataInservivel: "2024-05-15" },
           { id: 2, equipamentoId: 2, dataInservivel: "2024-05-16" }
         ];
         const inserviveisTableBody = document.getElementById("inserviveis-table");
         inserviveis.forEach(inservivel => {
                 const row = document.createElement("tr");
             row.innerHTML = `
                 <td>${inservivel.id}</td>
                 <td>${inservivel.equipamentoId}</td>
                 <td>${inservivel.dataInservivel}</td>
             `;
           inserviveisTableBody.appendChild(row);
         });
});