import { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaWindowClose } from 'react-icons/fa';
import { FormContainer } from './styles';
//import axios from 'axios';
import { TarefaContext } from '../../contexts/tarefaContext';

interface NovoModalProps {
    visibleNovoModal: boolean;
    fecharModal: () => void;
    visibleLoading: boolean;
    abrirLoading: () => void;
    fecharLoading: () => void;
}

export function NovoModal(props: NovoModalProps) {

    const {
        criarTarefas,
        editarTarefa,
        valoresPadraoEditarTarefa,
        atualizarTarefa,
        excluirTarefa
    
    } = useContext(TarefaContext);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quadro, setQuadro] = useState("1");

    useEffect(() => {
        if (editarTarefa.editar) {
            setTitulo(editarTarefa.tarefa?.titulo ?
                editarTarefa.tarefa.titulo : '');

            setDescricao(editarTarefa.tarefa?.descricao ?
                editarTarefa.tarefa.descricao : '')
            setQuadro(editarTarefa.tarefa?.quadro ? 
                editarTarefa.tarefa.quadro : '')
        }
    }, [editarTarefa.editar])

    function excluirItem() {
        if(editarTarefa.tarefa) {
            excluirTarefa(editarTarefa.tarefa)
            limparCamposAoFecharModal()
            props.abrirLoading();
            setTimeout(function () {
                props.fecharLoading();
            },800);
        }
    }

    function limparCamposAoFecharModal() {
        setTitulo('')
        setDescricao('')
        setQuadro('')
        valoresPadraoEditarTarefa();
        props.fecharModal();
    }

    function onSubmitModal(event: FormEvent) {
        console.log(quadro);
        //não deixa com que o formulario de reload na pagina
        event.preventDefault();

        if (editarTarefa.editar) {

            let obj: any = {
                ...editarTarefa.tarefa,
                titulo,
                descricao,
                quadro
        
            }

            // atualizarTarefa({
            //     id: editarTarefa.tarefa?.id ? editarTarefa.tarefa.id : '',
            //     titulo: titulo,
            //     descricao: descricao 
            // })
            atualizarTarefa(obj)
            props.abrirLoading();
            setTimeout(function () {
                props.fecharLoading();
            },800);
        } else {
            criarTarefas({
                titulo,
                descricao,
                quadro
            })
            props.abrirLoading();
            setTimeout(function () {
                props.fecharLoading();
            },800);
        }


        limparCamposAoFecharModal();
    }

    return (
        <Modal
            isOpen={props.visibleNovoModal}
            onRequestClose={() => limparCamposAoFecharModal()}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type='button'
                onClick={() => limparCamposAoFecharModal()}
                className="react-modal-close"
            >
                <FaWindowClose />
            </button>

            <FormContainer onSubmit={onSubmitModal} >
                <h2>{editarTarefa.editar ? 'Editar' : 'Cadastrar'} Tarefa</h2>
                <select required value={quadro} onChange={(event) => setQuadro(event.target.value)}>
                    <option value=''>Selecione</option>
                    <option value='1'>Quadro 1</option>
                    <option value='2'>Quadro 2</option>
                    <option value='3'>Quadro 3</option>                    
                </select>
                
                <input
                    placeholder='Titulo'
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                />

                <textarea
                    placeholder='Descrição'
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                />

                <button
                    type='submit'
                >
                    {editarTarefa.editar ? 'Editar' : 'Cadastrar'}
                </button>
                <button
                    type='button' hidden={!editarTarefa.editar} onClick={excluirItem} >
                    Excluir
                </button>
            </FormContainer>

        </Modal>
    )
}
