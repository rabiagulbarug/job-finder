'use client'
import Stepper from "@/components/Stepper/Stepper";
import {LastExperience} from "@/components/UpdateUser/LastExperience";
import {Education} from "@/components/UpdateUser/Education";
import {Language} from "@/components/UpdateUser/Language";
import {Skills} from "@/components/UpdateUser/Skills";
import {Address} from "@/components/UpdateUser/Address";
import {PersonalInformation} from "@/components/UpdateUser/PersonalInformation";
import {useUserUpdateMutation} from "@/handlers/user/use-user-update";
import {useStepper} from "@/hooks/useStepper";
import {useEffect} from "react";
import {useUserQuery} from "@/handlers/user/use-user";

export const Profile = () => {
    const { data } = useUserQuery();
    const {mutate} = useUserUpdateMutation()
    const {state, setStep, setFormValue, setForm} = useStepper();

    const stepperProps = {
        state,
        setStep,
        setFormValue,
    }

    useEffect(() => {
        if (state.currentStep === 7) {
            mutate(state.form);
        }
    }, [state]);

    useEffect(() => {
        if(data) {
            setForm(data.data)
        }
    }, [data])

    return (
        <div>
            <div className='flex flex-col grid-rows-2 w-full'>
                <Stepper
                    currentStep={state.currentStep}
                    setCurrentStep={setStep}
                />

                <div className='p-2.5'>
                    {state.currentStep === 1 && (
                        <PersonalInformation {...stepperProps} />
                    )}

                    {state.currentStep === 2 && (
                        <Address {...stepperProps} />
                    )}

                    {state.currentStep === 3 && (
                        <Skills {...stepperProps} />
                    )}

                    {state.currentStep === 4 && (
                        <LastExperience {...stepperProps} />
                    )}
                    {state.currentStep === 5 && (
                        <Education {...stepperProps} />
                    )}
                    {(state.currentStep === 6 || state.currentStep === 7) && (
                        <Language {...stepperProps} />
                    )}
                </div>
            </div>
        </div>
    )
}
