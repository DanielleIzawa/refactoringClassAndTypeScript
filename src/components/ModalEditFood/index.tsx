import React, { useRef, useCallback } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FormHandles } from "@unform/core";

import { Form } from "./styles";
import { Modal } from "../Modal";
import { Input } from "../Input";

interface IProps {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<IProps, "id" | "available">) => void;
  editingFood: IProps;
}

interface IEditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: IModalProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditFoodData) => {
      handleUpdateFood(data);

      setIsOpen();
    },
    [handleUpdateFood, setIsOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
