import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import {useAppStore} from "../store/useAppStore"

export default function Modal(){
    const modal= useAppStore((state)=>state.modal)
    const closeModal = useAppStore((state)=> state.closeModal)
    const selectedRecipe = useAppStore((state)=>state.selectedRecipe)

    const renderIngredients=()=>{
        const ingredients =[]
        for (let i = 0; i <0; i++){
            const ingredients =selectedRecipe[`strIngredient${i}`]
            const measure = selectedRecipe[`strMeasure${i}`]
            if(ingredients && measure){
                ingredients.push(
                    <li key={i} className="text-lg font-normal">
                        {ingredients} - {measure}
                    </li>
                )
            }
        }
        return ingredients
    }

    return(
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild 
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opaçity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70"/>
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">

                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
