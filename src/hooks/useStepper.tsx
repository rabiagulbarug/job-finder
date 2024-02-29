import {useReducer} from "react";

type SetStepAction = {
    type: 'SET_STEP',
    payload: {
        step: number
    }
}

type SetFormValueAction = {
    type: 'SET_FORM_VALUE',
    payload: {
        key: keyof StepperForm,
        value: any
    }
}

type SetFormAction = {
    type: 'SET_FORM',
    payload: any
}

type StepperDispatcher = SetStepAction | SetFormValueAction | SetFormAction;

export type StepperForm = {
    name: string
    surname: string
    phone: string
    profileImage: string
    dateOfBirth: string
    address : {
        details: string
        city: string
        country: string
    }
    skills: []
    experiences: [
        {
            company: string,
            position: string,
            startDate: string,
            endDate: string
        }
    ],
    education: [
        {
            institution: string,
            degree: string,
            startDate: string,
            endDate: string
        }
    ],
    languages: [
        {
            language: string,
            level: string
        }
    ]
}

export type StepperState = {
    currentStep: number,
    form: StepperForm
}

export type SetFormValueMethod = (key: keyof StepperForm, value: any) => void;
export type SetStepMethod = (step: number) => void;

const stepperReducer = (state: StepperState, action: StepperDispatcher) => {
    if (action.type === 'SET_STEP') {
        return {...state, currentStep: action.payload.step}
    }
    if (action.type === 'SET_FORM') {
        return {...state, form: action.payload}
    }
    if (action.type === 'SET_FORM_VALUE') {
        const form = state.form;
        form[action.payload.key] = action.payload.value;
        return {...state, form}
    }
    return state
};

export const useStepper = () => {
    const [state, dispatch] = useReducer(stepperReducer, {
        currentStep: 1,
        form: {
            name: '',
            surname: '',
            phone: '',
            profileImage: '',
            dateOfBirth: '',
            address : {
                details: '',
                city: '',
                country: ''
            },
            skills: [],
            experiences: [
                {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: ''
                }
            ],
            education: [
                {
                    institution: '',
                    degree: '',
                    startDate: '',
                    endDate: ''
                }
            ],
            languages: [
                {
                    language: '',
                    level: ''
                }
            ]

        }
    })

    const setFormValue: SetFormValueMethod = (key: keyof StepperForm, value: string) => dispatch({
        type: 'SET_FORM_VALUE',
        payload: {key, value}
    });
    const setForm = (object: any) => dispatch({type: 'SET_FORM', payload: object})
    const setStep: SetStepMethod = (step: number) => dispatch({type: 'SET_STEP', payload: {step}})

    return {state, setFormValue, setStep, setForm}
}
