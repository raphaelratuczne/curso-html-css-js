var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modal = document.querySelector("#modal");
const btnAddEndereco = document.querySelector(".btn-add");
const btnCancelar = document.querySelector(".btn-cancel");
btnAddEndereco.onclick = () => {
    modal === null || modal === void 0 ? void 0 : modal.showModal();
};
btnCancelar.onclick = () => {
    modal === null || modal === void 0 ? void 0 : modal.close();
};
const id = new URLSearchParams(window.location.search).get("id");
function loadUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            return;
        }
        const resp = yield fetch(`http://127.0.0.1:3500/usuarios/${id}?_embed=documentos&_embed=enderecos`);
        const user = yield resp.json();
        console.log("user", user);
        showUserData(user);
    });
}
loadUser(Number(id));
function showUserData(user) {
    return __awaiter(this, void 0, void 0, function* () {
        document
            .querySelector("#linkEditUser")
            .setAttribute("href", `form.html?id=${user.id}`);
        const elFoto = document.querySelector("#uFoto");
        elFoto.setAttribute("src", user.foto);
        elFoto.hidden = false;
        document.querySelector("#uId").textContent = String(user.id);
        document.querySelector("#uNome").textContent = `${user.nome} ${user.sobrenome}`;
        document.querySelector("#uEmail").textContent = user.email;
        const [ano, mes, dia] = user.nascimento.split("-");
        document.querySelector("#uNasc").textContent = `${dia}/${mes}/${ano}`;
        document.querySelector("#uCpf").textContent = user.cpf;
        document.querySelector("#uCel").textContent = user.celular;
        document.querySelector("#uSexo").textContent =
            user.sexo === "M" ? "Masculino" : "Feminino";
        document.querySelector("#uOfer").textContent = user.receber_ofertas
            ? "Sim"
            : "Não";
        document.querySelector("#uObs").textContent = user.observacao;
        const departamentos = yield loadDepartamentos();
        const interesses = user.interesses.map((id) => {
            const depart = departamentos.find((d) => d.id === id);
            return depart === null || depart === void 0 ? void 0 : depart.nome;
        });
        document.querySelector("#uInter").textContent = interesses.join(", ");
        const listaArquivos = document.querySelector("#lista-arquivos");
        listaArquivos.innerHTML = "";
        if (user.documentos) {
            for (const doc of user.documentos) {
                const divDoc = document.createElement("div");
                divDoc.classList.add("arquivo");
                divDoc.innerHTML = `
        <p><strong>Nome:</strong> ${doc.nome}</p>
        <p><strong>Arquivo:</strong> <a href="#">${doc.nome}.pdf</a></p>
        <button class="btn-delete">Excluir</button>
      `;
                listaArquivos.appendChild(divDoc);
            }
        }
        const listaEnderecos = document.querySelector("#lista-enderecos");
        listaEnderecos.innerHTML = "";
        if (user.enderecos) {
            for (const end of user.enderecos) {
                const divEnd = document.createElement("div");
                divEnd.classList.add("endereco");
                divEnd.innerHTML = `
        <p><strong>Identificação:</strong> ${end.nome}</p>
        <p><strong>CEP:</strong> ${end.cep}</p>
        <p><strong>Logradouro:</strong> ${end.rua}</p>
        <p><strong>Número:</strong> ${end.numero}</p>
        <p><strong>Complemento:</strong> ${end.complemento}</p>
        <p><strong>Bairro:</strong> ${end.bairro}</p>
        <p><strong>Cidade:</strong> ${end.cidade}</p>
        <p><strong>Estado:</strong> ${end.estado}</p>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      `;
                listaEnderecos.appendChild(divEnd);
            }
        }
    });
}
function loadDepartamentos() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/departamentos");
        return yield resp.json();
    });
}
export {};
