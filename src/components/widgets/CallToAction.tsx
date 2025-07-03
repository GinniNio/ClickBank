import { CallToActionProps } from '~/shared/types';
import CTA from '../common/CTA';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';

const CallToAction = ({ header, callToAction, id, hasBackground = false }: CallToActionProps) => {
  return (
    <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
      {header && <Headline header={header} containerClass="max-w-4xl" titleClass="text-2xl sm:text-3xl" />}
      <div className="flex justify-center">
        {callToAction && <CTA callToAction={callToAction} linkClass="btn btn-primary" />}
      </div>
    </WidgetWrapper>
  );
};

export default CallToAction; 