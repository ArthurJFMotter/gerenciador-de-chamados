document.addEventListener("DOMContentLoaded", function() {
    const chamadoForm = document.getElementById("chamadoForm");
   const idInput = document.getElementById("id");

  const urlParams = new URLSearchParams(window.location.search);
  const chamadoId = urlParams.get('id');
   if (chamadoId) {
     fetchChamado(chamadoId);
    }


    chamadoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const chamadoData = {
           id: document.getElementById('id').value,
            dataAbertura: document.getElementById('dataAbertura').value,
            solicitante: document.getElementById('solicitante').value,
            solicitacao: document.getElementById('solicitacao').value,
            status: document.getElementById('status').value,
             resumo: document.getElementById('resumo').value,
          senhaConsulta: Math.random().toString(36).substring(2, 15).toUpperCase()
        };

       if (chamadoData.id) {
              updateChamado(chamadoData);
        } else {
             chamadoData.id = new Date().toISOString().slice(0,19).replace(/[-T:]/g, "")
            createChamado(chamadoData);
        }
       window.location.href = '../ticket-management.html';

    });

      async function fetchChamado(id) {
       try {
           const chamado = await getChamado(id);
            document.getElementById('id').value = chamado.id;
             document.getElementById('dataAbertura').value = chamado.dataAbertura;
             document.getElementById('solicitante').value = chamado.solicitante;
             document.getElementById('solicitacao').value = chamado.solicitacao;
            document.getElementById('status').value = chamado.status;
            document.getElementById('resumo').value = chamado.resumo;
       } catch (error) {
             console.error("Erro ao buscar chamado:", error);
       }

      }


});