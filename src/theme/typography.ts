import {CSSProperties} from 'react';
import {TypographyOptions} from '@mui/material/styles/createTypography';

// IMPORTANT!!!
// Need to synchronize by hand with the storybook
export const fontFamilyString = `Inter, sans-serif`;

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1: CSSProperties;
    h2: CSSProperties;
    h2bold: CSSProperties;
    h3: CSSProperties;
    h3bold: CSSProperties;
    button: CSSProperties;
    b1regular: CSSProperties;
    b1medium: CSSProperties;
    b1bold: CSSProperties;
    b2regular: CSSProperties;
    b2medium: CSSProperties;
    b2bold: CSSProperties;
    b3regular: CSSProperties;
    b3medium: CSSProperties;
    b3bold: CSSProperties;
    b4regular: CSSProperties;
    b4medium: CSSProperties;
    b4bold: CSSProperties;
    b5regular: CSSProperties;
    b5medium: CSSProperties;
    b5bold: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1?: CSSProperties;
    h2?: CSSProperties;
    h2bold?: CSSProperties;
    h3?: CSSProperties;
    h3bold?: CSSProperties;
    button?: CSSProperties;
    b1regular?: CSSProperties;
    b1medium?: CSSProperties;
    b1bold?: CSSProperties;
    b2regular?: CSSProperties;
    b2medium?: CSSProperties;
    b2bold?: CSSProperties;
    b3regular?: CSSProperties;
    b3medium?: CSSProperties;
    b3bold?: CSSProperties;
    b4regular?: CSSProperties;
    b4medium?: CSSProperties;
    b4bold?: CSSProperties;
    b5regular?: CSSProperties;
    b5medium?: CSSProperties;
    b5bold?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ///////////////////////////////////////////////
    // disable most of builtin variants
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    caption: false;
    overline: false;
    // disable most of builtin variants
    ///////////////////////////////////////////////

    //=============================================
    // Variants from Figma
    h1: true;
    h2: true;
    h2bold: true;
    h3: true;
    h3bold: true;
    button: true;
    b1regular: true;
    b1medium: true;
    b1bold: true;
    b2regular: true;
    b2medium: true;
    b2bold: true;
    b3regular: true;
    b3medium: true;
    b3bold: true;
    b4regular: true;
    b4medium: true;
    b4bold: true;
    b5regular: true;
    b5medium: true;
    b5bold: true;
    // Variants from Figma
    //=============================================
  }
}

export const regularProps = {
  fontFamily: 'Inter Regular',
  fontWeight: 400,
} as const;

export const mediumProps = {
  fontFamily: 'Inter Medium',
  fontWeight: 500,
} as const;

export const boldProps = {
  fontFamily: 'Inter Bold',
  fontWeight: 700,
} as const;

export const typographyOptions: TypographyOptions = {
  ///////////////////////////////////////////////
  // disable most of builtin variants
  h4: undefined,
  h5: undefined,
  h6: undefined,
  body1: undefined,
  body2: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
  caption: undefined,
  overline: undefined,
  // disable most of builtin variants
  ///////////////////////////////////////////////

  //=============================================
  // Variants from Figma
  h1: {
    fontSize: 32,
    ...boldProps,
    lineHeight: '37px',
  },
  h2: {
    fontSize: 22,
    ...mediumProps,
    lineHeight: '25px',
  },
  h2bold: {
    fontSize: 22,
    ...boldProps,
    lineHeight: '25px',
  },
  h3: {
    fontSize: 20,
    ...mediumProps,
    lineHeight: '23px',
  },
  h3bold: {
    fontSize: 20,
    ...boldProps,
    lineHeight: '23px',
  },
  button: {
    textTransform: 'none',
    fontSize: 14,
    ...mediumProps,
    lineHeight: '20px',
  },
  /////////////////////////////////////////////////////////
  b1regular: {
    fontSize: 17,
    ...regularProps,
    lineHeight: '22px',
  },
  b1medium: {
    fontSize: 17,
    ...mediumProps,
    lineHeight: '22px',
  },
  b1bold: {
    fontSize: 17,
    ...boldProps,
    lineHeight: '22px',
  },
  /////////////////////////////////////////////////////////
  b2regular: {
    fontSize: 16,
    ...regularProps,
    lineHeight: '20px',
  },
  b2medium: {
    fontSize: 16,
    ...mediumProps,
    lineHeight: '20px',
  },
  b2bold: {
    fontSize: 16,
    ...boldProps,
    lineHeight: '20px',
  },
  /////////////////////////////////////////////////////////
  b3regular: {
    fontSize: 15,
    ...regularProps,
    lineHeight: '18px',
  },
  b3medium: {
    fontSize: 15,
    ...mediumProps,
    lineHeight: '18px',
  },
  b3bold: {
    fontSize: 15,
    ...boldProps,
    lineHeight: '18px',
  },
  /////////////////////////////////////////////////////////
  b4regular: {
    fontSize: 13,
    ...regularProps,
    lineHeight: '16px',
  },
  b4medium: {
    fontSize: 13,
    ...mediumProps,
    lineHeight: '16px',
  },
  b4bold: {
    fontSize: 13,
    ...boldProps,
    lineHeight: '16px',
  },
  /////////////////////////////////////////////////////////
  b5regular: {
    fontSize: 12,
    ...regularProps,
    lineHeight: '15px',
  },
  b5medium: {
    fontSize: 12,
    ...mediumProps,
    lineHeight: '15px',
  },
  b5bold: {
    fontSize: 12,
    ...boldProps,
    lineHeight: '15px',
  },
  // Variants from Figma
  //=============================================
};

export default typographyOptions;
