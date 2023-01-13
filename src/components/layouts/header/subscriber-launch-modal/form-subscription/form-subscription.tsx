import {useState} from 'react';

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
      className="space-y-3"
    >
      <div>
        <label htmlFor="name_subscription">Nom</label>
        <Input
          id="name_subscription"
          required
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email_subscription">Adresse email</label>
        <Input
          id="email_subscription"
          type="email"
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </div>
    </form>
  );
};

export {FormSubscription};
