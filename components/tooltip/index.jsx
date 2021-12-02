import { usePopperTooltip } from 'react-popper-tooltip'
import styled from 'styled-components'
import PropTypes from 'prop-types'
export const TooltipContainer = styled.div`
  &.tooltip-container {
    --tooltipBackground: ${({ theme }) => theme.colors.gray[600]};
    --tooltipBorder: ${({ theme }) => theme.colors.gray[600]};

    background-color: var(--tooltipBackground);
    border-radius: 3px;
    border: 1px solid var(--tooltipBorder);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    color: ${({ theme }) => theme.colors.gray[400]};
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
    transition: opacity 0.3s;
    z-index: 9999;
  }

  &.tooltip-container[data-popper-interactive='false'] {
    pointer-events: none;
  }

  .tooltip-arrow {
    height: 1rem;
    position: absolute;
    width: 1rem;
    pointer-events: none;
  }

  .tooltip-arrow::before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  .tooltip-arrow::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }

  &.tooltip-container[data-popper-placement*='bottom'] .tooltip-arrow {
    left: 0;
    margin-top: -0.4rem;
    top: 0;
  }

  &.tooltip-container[data-popper-placement*='bottom'] .tooltip-arrow::before {
    border-color: transparent transparent var(--tooltipBorder) transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
    position: absolute;
    top: -1px;
  }

  &.tooltip-container[data-popper-placement*='bottom'] .tooltip-arrow::after {
    border-color: transparent transparent var(--tooltipBackground) transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
  }

  &.tooltip-container[data-popper-placement*='top'] .tooltip-arrow {
    bottom: 0;
    left: 0;
    margin-bottom: -1rem;
  }

  &.tooltip-container[data-popper-placement*='top'] .tooltip-arrow::before {
    border-color: var(--tooltipBorder) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
    position: absolute;
    top: 1px;
  }

  &.tooltip-container[data-popper-placement*='top'] .tooltip-arrow::after {
    border-color: var(--tooltipBackground) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
  }

  &.tooltip-container[data-popper-placement*='right'] .tooltip-arrow {
    left: 0;
    margin-left: -0.7rem;
  }

  &.tooltip-container[data-popper-placement*='right'] .tooltip-arrow::before {
    border-color: transparent var(--tooltipBorder) transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
  }

  &.tooltip-container[data-popper-placement*='right'] .tooltip-arrow::after {
    border-color: transparent var(--tooltipBackground) transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
    left: 6px;
    top: 0;
  }

  &.tooltip-container[data-popper-placement*='left'] .tooltip-arrow {
    margin-right: -0.7rem;
    right: 0;
  }

  &.tooltip-container[data-popper-placement*='left'] .tooltip-arrow::before {
    border-color: transparent transparent transparent var(--tooltipBorder);
    border-width: 0.5rem 0 0.5rem 0.4em;
  }

  &.tooltip-container[data-popper-placement*='left'] .tooltip-arrow::after {
    border-color: transparent transparent transparent var(--tooltipBackground);
    border-width: 0.5rem 0 0.5rem 0.4em;
    left: 3px;
    top: 0;
  }

  width: 260px;
`

export const Tooltip = (props) => {
  const { renderButton } = props
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ delayShow: 200, delayHide: 200 })

  return (
    <>
      {renderButton(setTriggerRef)}
      {visible && (
        <TooltipContainer
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {props.children}
        </TooltipContainer>
      )}
    </>
  )
}
Tooltip.propTypes = {
  renderButton: PropTypes.any.isRequired,
  children: PropTypes.any
}
export default Tooltip
