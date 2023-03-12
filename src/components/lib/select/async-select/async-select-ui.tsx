import { forwardRef, useEffect, useState } from 'react';
import DefaultAsyncSelect from 'react-select/async';

import { Variant } from '@helpers/variants';

import useDebounce from '@hooks/use-debounce/use-debounce';

import { DEBOUNCE_QUERIES_MS } from '@constants/index';

import { defaultComponents } from '../_components';
import { defaultStyles, defaultTheme } from '../_components/styles';

/**
 * --------- USAGE OF THE COMPONENTS------------------
 *
 * const loadMemberOptions = async (inputValue: string) => {
 *  //REFETCH from apollo client
 *   const {data, refetch,variables, loading} = useMembers({
    variables: {
      first: 5,
    },
  });
  const loadMemberOptions = async (inputValue: string) => {
    const response = await refetch({
      kwSearch: inputValue,
    });
    return response?.data?.members?.edges?.map(el => ({
      label: el.node.username,
      value: el.node.id,
      avatar: el.node.person.expert?.avatar,
      email: el.node.email,
    }));
  };
* 
*    <AsyncSelectUI
        isLoading={loading && !!variables?.kwSearch}
      onSearch={loadMemberOptions}
      formatOptionLabel={(data: any) => {
        return (
          <ButtonItem
            hovered={false}
            iconBefore={
              <Avatar size="lg" src={data?.avatar} name={data?.label} />
            }
            description={<p className="text-sm">{data?.email}</p>}
          >
            {data?.label}
          </ButtonItem>
        );
      }}
      defaultOptions={data?.members?.edges?.map(el => ({
        label: el.node.username,
        value: el.node.id,
        avatar: el.node.person.expert?.avatar,
        email: el.node.email,
      }))}
    />
 *
 *
 * For used with apollo, we need to handle request by using `refetch`
 */
const AsyncSelectUI = forwardRef<
  any,
  Omit<React.ComponentProps<DefaultAsyncSelect>, 'loadOptions'> & {
    throttle?: number;
    variant?: Variant;

    onSearch: (inputValue: string) => Promise<any>;
    setParentValue?: any;
  }
>(
  (
    {
      styles,
      components,
      onSearch,
      onChange,
      defaultValue,
      value,
      variant,
      setParentValue,
      throttle = DEBOUNCE_QUERIES_MS,
      ...rest
    },
    ref
  ) => {
    const [searchInput, setSearchInput] = useState(null);
    const [options, setOptions] = useState([]);

    const handleOnchange = (el, actionMeta) => {
      setParentValue && setParentValue(el);
      onChange(el, actionMeta);
    };

    useEffect(() => {
      if (defaultValue) {
        setParentValue && setParentValue(defaultValue);
      }
    }, [defaultValue, setParentValue]);

    useDebounce(
      async () => {
        const options = await onSearch(searchInput);
        setOptions(options);
      },
      throttle,
      [searchInput]
    );

    const debouncedSearch = (inputValue, fn) => {
      setSearchInput(inputValue);
      fn(options);
    };

    return (
      <DefaultAsyncSelect
        ref={ref}
        {...rest}
        value={value}
        aria-invalid={variant === 'danger' ? 'true' : 'false'}
        onChange={handleOnchange}
        loadOptions={debouncedSearch}
        components={{
          ...defaultComponents,
          ...components,
        }}
        styles={{ ...defaultStyles(variant), ...styles }}
        theme={defaultTheme}
        isClearable
        classNamePrefix="agorasafe__select"
      />
    );
  }
);

AsyncSelectUI.displayName = 'AsyncSelectUI';

export default AsyncSelectUI;
