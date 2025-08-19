import * as React from 'react';
import { Button, Card, CardFooter, CardHeader, CardPreview, Label } from '@fluentui/react-components';
import { ThumbLike20Filled } from '@fluentui/react-icons';

export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <Card>
        <CardHeader header={
            <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Hello {this.props.name}!
            </Label>
          }>
        </CardHeader>
        <CardPreview>
          <Label>
            This is a simple PCF control that displays a greeting message.
          </Label>
        </CardPreview>
        <CardFooter>
          <Button icon={<ThumbLike20Filled style={{ color: 'blue' }}/>}>Like</Button>
        </CardFooter>
      </Card>
    )
  }
}
