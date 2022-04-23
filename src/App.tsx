import { useState } from 'react';
import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { NovoModal } from './components/Modal'
import Modal from 'react-modal';
import { ListagemTarefas } from './components/ListagemTarefas';
import { TarefasProvider } from './contexts/tarefaContext';
import { AbreLoading } from './components/Loading';

Modal.setAppElement('#root');
function App() {

    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [carregaLoading, setCarregaLoading] = useState(false);


    function abrirModal() {
        setVisibleModal(true)
    }

    function fecharModal() {
        setVisibleModal(false)
    }

    function abrirLoading() {
        setCarregaLoading(true);
    }

    function fecharLoading() {
        setCarregaLoading(false);   
    }

    return (
        <TarefasProvider>
            <div>
            {carregaLoading ? <AbreLoading/> : ''}
                <GlobalStyle />

                <Header abrirModal={abrirModal} />

                <ListagemTarefas abrirModal={abrirModal} />

                <NovoModal
                    visibleNovoModal={visibleModal}
                    fecharModal={fecharModal}
                    visibleLoading={carregaLoading}
            abrirLoading={abrirLoading}
            fecharLoading={fecharLoading}
                />

            </div>
        </TarefasProvider>
    );
}

export default App;
