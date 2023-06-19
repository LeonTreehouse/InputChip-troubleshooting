<script lang="ts">
    import { InputChip, toastStore, type ToastSettings, Toast, FileDropzone } from '@skeletonlabs/skeleton'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
    import {superForm} from 'sveltekit-superforms/client'
    import {validators} from './validators'

    export let data;

    const initialFormState = {

        chips: [],

    };

    function resetForm() {
        for (const key in initialFormState) {
            // @ts-ignore
            form.update(_state => {
                if (_state.hasOwnProperty(key)) {
                    // @ts-ignore
                    _state[key] = initialFormState[key];
                }
                return _state;
            });
        }
    }

    // @ts-ignore
    const {form, enhance, errors } = superForm(data.form, {validators,
        // @ts-ignore
        onUpdate({form}) {

            if (form.valid) {
                console.log('Logging chips after submssion before reset: ',$form.chips)
                toastStore.trigger(ts)
                resetForm();
                console.log('Logging chips after submssion after reset: ',$form.chips)
            }  
            
            if (!form.valid) {
                toastStore.trigger(te)
            }
    }})

    const ts: ToastSettings = {
	    message: 'Your collection has been submitted for review!',
        timeout: 3000,
        background: 'bg-gradient-to-tr from-primary-500 via-primary-900 to-surface-500 text-white',
    };

    const te: ToastSettings = {
	    message: 'Error when submitting your collection!',
        timeout: 3000,
        background: 'bg-gradient-to-tr from-error-500 via-error-900 to-surface-500 text-white',
    };

    const checkChips = () => {
        console.log($form.chips)
    }


</script>

<SuperDebug data={$form}/>

<Toast />

<form method="POST" enctype="multipart/form-data" use:enhance >
    <h3>Categories (Optional)</h3>
    <InputChip class="mb-3" name="chips" placeholder="Write a tag then enter" bind:value={$form.chips} allowUpperCase />
    <button on:click={checkChips}>
        Check $form.chips
    </button>
    {#if $errors.chips}
        <small>{$errors.chips}</small>
    {/if}
    <button class="btn variant-ringed-primary">Submit</button>
</form>

            

