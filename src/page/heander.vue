


<template>
<section id="app">   <CHeader>
  <CContainer fluid>
    <CHeaderBrand href="#">Header 1</CHeaderBrand>
    <CDropdown togglerText="Dropdown 1" variant="nav-item">
      <CDropdownItem href="#">Action 1</CDropdownItem>
      <CDropdownItem href="#">Another action 1</CDropdownItem>
      <CDropdownItem href="#">Something else here 1</CDropdownItem>
    </CDropdown>
    <CHeaderBrand>
      <img src="logo.png" alt="Logo" />
    </CHeaderBrand>
    <CHeaderBrand href="#">Header 2</CHeaderBrand>
    <CDropdown togglerText="Dropdown 2" variant="nav-item">
      <CDropdownItem href="#">Action 2</CDropdownItem>
      <CDropdownItem href="#">Another action 2</CDropdownItem>
      <CDropdownItem href="#">Something else here 2</CDropdownItem>
    </CDropdown>
  </CContainer>
</CHeader>
</section>

</template>



<script >
import{ CHeader, CContainer, CHeaderBrand, CDropdown, CDropdownItem } from '@coreui/vue';
export default {
  components: {
    CHeader,
    CContainer,
    CHeaderBrand,
    CDropdown,
    CDropdownItem
  }
}
</script>
