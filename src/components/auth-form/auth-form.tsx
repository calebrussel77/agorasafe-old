import {signIn, signOut, useSession} from 'next-auth/react';
import {FC} from 'react';

import {Field} from '@components/lib/Field/Field';
import {Button} from '@components/lib/button/button';
import {Checkbox} from '@components/lib/checkbox/checkbox';
import {HelperMessage} from '@components/lib/helper-message/helper-message';
import {Input} from '@components/lib/input/input';
import {Label} from '@components/lib/label/label';

type TAuthFormProps = {
  mode: 'register' | 'login';
};

const AuthForm: FC<TAuthFormProps> = ({mode}) => {
  const isLoginPage = mode === 'login';

  return (
    <form className="space-y-6">
      {!isLoginPage && (
        <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-3">
          <Field
            autoFocus={!isLoginPage}
            id="lastName_auth"
            required
            label="Nom"
          >
            <Input placeholder="Entrez votre nom" />
          </Field>
          <Field id="lastName_auth" required label="Prénom">
            <Input placeholder="Entrez votre prénom" />
          </Field>
        </div>
      )}
      <Field
        id="email_auth"
        autoFocus={isLoginPage}
        required
        label="Adresse email"
      >
        <Input type="email" placeholder="Entrez votre adresse email" />
      </Field>
      <Field id="password_auth" required label="Mot de passe">
        <Input type="password" placeholder="Entrez votre mot de passe" />
      </Field>
      {!isLoginPage && (
        <>
          <Field
            id="confirm_password"
            required
            label="Confirmer le mot de passe"
          >
            <Input type="password" placeholder="Confirmez votre mot de passe" />
          </Field>
          <div className="space-y-2">
            <Label required>Je souhaite : </Label>
            <div className="flex items-center flex-wrap gap-2 justify-between">
              <Field id="seller_service" label="Proposer mes services">
                <Checkbox />
              </Field>
              <Field id="customer_paid" label="Demander des services">
                <Checkbox />
              </Field>
            </div>
          </div>
        </>
      )}
      <Button variant="primary" className="w-full">
        Connexion
      </Button>
      {!isLoginPage && (
        <HelperMessage className="text-sm text-gray-500">
          En vous inscrivant vous acceptez les conditions générales et la
          politique de confidentialité
        </HelperMessage>
      )}
      <HelperMessage>
        Vos données personnelles (email et nom d'utilisateur) ne sont utilisées
        qu'à des fins d'authentification et ne sont pas partagées avec des
        tiers.
      </HelperMessage>
    </form>
  );
};

export {AuthForm};
