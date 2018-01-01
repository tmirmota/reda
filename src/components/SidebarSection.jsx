import React from 'react'

const SidebarSectionRow = () => (
  <div>
    <span>Row Heading</span>
    <span className="float-right">Row Value</span>
  </div>
)

const SidebarSection = () => (
  <div>
    <div className="sidebar-section-heading">
      <strong className="text-uppercase">Section Heading</strong>
      <SidebarSectionRow />
    </div>
  </div>
)

export default SidebarSection
