import {useState} from 'react';

import {Field} from '@components/lib/Field/Field';
import {Input} from '@components/lib/input/input';

const FormSubscription = ({onSubmit, formRef}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit({email_subscription: email, name_subscription: name});
      }}
      ref={formRef}
      className="space-y-6"
    >
      <Field autoFocus id="name_subscription" required label="Nom">
        <Input
          value={name}
          placeholder="Entrez votre nom"
          onChange={(e: any) => setName(e.target.value)}
        />
      </Field>
      <Field id="email_subscription" required label="Adresse email">
        <Input
          type="email"
          value={email}
          placeholder="Entrez votre adresse email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </Field>
    </form>
  );
};

export {FormSubscription};
